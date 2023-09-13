import { Body, Get, Post, Query, Route } from 'tsoa';
import { Event, UpdatableFields } from './models';
import { EventService } from './service';

@Route('/')
class Controller {
	private readonly service: EventService;

	constructor(service: EventService) {
		this.service = service;
	}

    /**
	 * Returns a event by id
	 * @param id the id of the event
	 * @example id "1"
	 */
	@Get('/event/:id')
	public async getEventById(id: number): Promise<Event> {
        return this.service.getById(id);
	}

	/**
	 * returns a detailed list of all the events
     * @param start the start time of the sale - should be in unix timestamp
     * @example start "1656626400"
	 */
	@Get('/events')
	public async getEvents(@Query() start?: number): Promise<Event[]> {
        return this.service.get(start);
	}

    /**
	 * updates a event by id
     * @param id the id of the event
     * @example id "1"
     * @param requestBody the fields to update
	 */
    @Post('/event/:id')
    public async updateEvent(id: number, @Body() requestBody: UpdatableFields): Promise<Event> {
        const mapToDbColumn: Record<string, string> = {
            eventTitle: 'title',
            lineUp: 'lineup',
            assetUrl: 'asset_url',
        }

        const eventQueryFields: Record<string, string> = {}
        Object.entries(requestBody).forEach(([key, value]) => {
            if (value && key && key !== 'collectionName') {
                const column = mapToDbColumn[key];
                if (column) {
                    const val = column === 'lineup' ? value.join('-') : value;
                    eventQueryFields[mapToDbColumn[key]] = val;
                }
                
            }
        })
        console.log('eventQueryFields', eventQueryFields)
        return this.service.update(id, eventQueryFields, requestBody.collectionName);
    }
}

export default Controller;