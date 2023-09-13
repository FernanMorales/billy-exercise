import { Client } from 'pg';
import { Event, TicketCollection, UpdatableFields } from './models';

const allowedExtensions = new Set(['mp4', 'png', 'jpeg'])

const mapRowToEvent = (row: any): Event => {
    let startDatetime = new Date(row.start_date_time);
    let endDatetime = new Date(row.end_date_time);
    
    startDatetime.setHours(startDatetime.getHours() + 2);
    endDatetime.setHours(endDatetime.getHours() + 2);

    const lineUp = row.lineup ? row.lineup.split('-') : [];

    const extension = row.asset_url.split('.').pop();
    const assetUrl = allowedExtensions.has(extension) ? row.asset_url : null;
    return {
        eventId: row.id,
        title: row.title,
        startDatetime,
        endDatetime,
        address: row.address,
        locationName: row.location_name,
        totalTicketsCount: row.total_tickets_count,
        assetUrl,
        lineUp,
        ticketCollections: []
    }
}



const mapRowToTicketCollection = (row: any): TicketCollection => {
    return {
        collectionName: row.collection_name,
        scAddress: row.sc_address,
        collectionAddress: row.collection_address,
        pricePerToken: row.price_per_token,
        maxMintPerUser: row.max_mint_per_user,
        saleSize: row.sale_size
    }
}

export class EventService {
    client: Client;
    constructor(pgClient: Client) {
        this.client = pgClient;
    }

    async get(saleStartDate?: number): Promise<Event[]> {
        const eventQueryResult = await this.client.query('SELECT * FROM events');
        const events = eventQueryResult.rows.map(mapRowToEvent);

        const ticketQueryResult = await this.client.query("SELECT \
        e.event_id, \
        e.collection_name, \
        e.smart_contract->'crowdsale' as sc_address, \
        e.smart_contract->'collection' as collection_address, \
        e.smart_contract->'sale_params'->'price_per_token' as price_per_token, \
        e.smart_contract->'sale_params'->'max_mint_per_user' as max_mint_per_user, \
        e.smart_contract->'sale_params'->'sale_size' as sale_size, \
        e.smart_contract->'sale_params'->'start_time' as start_time FROM events AS d INNER JOIN contracts AS e ON d.id = e.event_id");

        ticketQueryResult.rows.forEach((ticket: any) => {
            const event = events.find((event) => event.eventId === ticket.event_id);
            if (event) {
                event.ticketCollections.push(mapRowToTicketCollection(ticket));
            }
        })

        if (saleStartDate) {
            const ticketToFilter = ticketQueryResult.rows.filter((ticket: any) => ticket.start_time === saleStartDate).map((ticket: any) => ticket.event_id);
            const ticketSet = new Set(ticketToFilter);
            return events.filter((event) => ticketSet.has(event.eventId));
        }
        return events;
    }

    async getById(id: number): Promise<Event> {
        const eventQueryResult = await this.client.query('SELECT * FROM events WHERE id = $1', [id]);
        const ticketQueryResult = await this.client.query("SELECT \
        e.event_id, \
        e.collection_name, \
        e.smart_contract->'crowdsale' as sc_address, \
        e.smart_contract->'collection' as collection_address, \
        e.smart_contract->'sale_params'->'price_per_token' as price_per_token, \
        e.smart_contract->'sale_params'->'max_mint_per_user' as max_mint_per_user, \
        e.smart_contract->'sale_params'->'sale_size' as sale_size \
        FROM events d INNER JOIN contracts e ON d.id = e.event_id WHERE e.event_id = $1", [id]);

        const event = mapRowToEvent(eventQueryResult.rows[0]);
        event.ticketCollections = ticketQueryResult.rows.map(mapRowToTicketCollection);
        return event;
    }

    buildQuery(eventQueryFields: Record<string, string>, eventQueryValues: any[]): string {
        let query = 'UPDATE events SET'
        Object.keys(eventQueryFields).forEach((key, index) => {
            query += ` ${key} = $${index + 1}`;
            if (index !== Object.keys(eventQueryFields).length - 1) {
                query += ',';
            }
        })
        query += ` WHERE id = $${eventQueryValues.length}`;
        return query;
    }

    async update(id: number, eventQueryFields: Record<string, string>, collectionName?: string): Promise<Event> {
        const eventQueryValues: any[] = Object.values(eventQueryFields);
        if (eventQueryValues.length > 0) {{
            eventQueryValues.push(id);
            const query = this.buildQuery(eventQueryFields, eventQueryValues);
            await this.client.query(query, eventQueryValues);
        }}
        if (collectionName) {
            await this.client.query('UPDATE contracts SET collection_name = $1 WHERE event_id = $2', [collectionName, id]);
        }
        return this.getById(id)
    }
}