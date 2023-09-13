/* istanbul ignore file */
import { Event } from './models';

export const mockClientResult = [
	{
		id: 1,
		title: "Mouse Party",
		start_date_time: "2022-07-10 18:30:00",
		end_date_time: "2022-07-11 01:00:00",
		location_name: "L'Astrolabe",
		address: "1 Rue Alexandre Avisse 45000 Orléans",
		total_tickets_count: 500,
		max_tickets_per_user: 5,
		sale_start_date: "2022-07-01",
		lineup: "Mehdi Maïzi-Rad Cartier-Squidji",
		asset_url: "https://photos.com/mouseparty.png"
	},
    {
        id: 5,
        title: "Hellfest",
        start_date_time: "2023-07-01 15:00:00",
        end_date_time: "2023-07-03 23:59:00",
        location_name: "Clisson",
        address: "Clisson France",
        total_tickets_count: 10000,
        max_tickets_per_user: 6,
        sale_start_date: "2023-01-01",
        lineup: "Metal Band-Rock Band",
        asset_url: "https://hellfest.com/hellfest_asset.png"
    }
]

export const mockClientUpdateResult = [
	{
		id: 1,
		title: "test",
		start_date_time: "2022-07-10 18:30:00",
		end_date_time: "2022-07-11 01:00:00",
		location_name: "L'Astrolabe",
		address: "1 Rue Alexandre Avisse 45000 Orléans",
		total_tickets_count: 500,
		max_tickets_per_user: 5,
		sale_start_date: "2022-07-01",
		lineup: "test",
		asset_url: "test"
	},
]

export const mockUpdatedContract = [{
    id: 1,
    event_id: 1,
    collection_name: "test",
    sc_address: "KT1AKqxCJH9EPimNm1wo1BEgG9bFRgptJwkk",
    collection_address: "KT1Apf8CPkYBe3bRuTCET6A4NhnosX2BAnp9",
    price_per_token: 4,
    max_mint_per_user: 5,
    sale_size: 500,
    start_time: 1656626400,
}]

export const mockEvents: Event[] = [
    {
        eventId: 1,
        title: "Mouse Party",
        startDatetime: new Date("2022-07-10T18:30:00.000Z"),
        endDatetime: new Date("2022-07-11T01:00:00.000Z"),
        address: "1 Rue Alexandre Avisse 45000 Orléans",
        locationName: "L'Astrolabe",
        totalTicketsCount: 500,
        assetUrl: "https://photos.com/mouseparty.png",
        lineUp: [
            "Mehdi Maïzi",
            "Rad Cartier",
            "Squidji"
        ],
        ticketCollections: [ 
            {
                collectionName: "Mouse On",
                scAddress: "KT1AKqxCJH9EPimNm1wo1BEgG9bFRgptJwkk",
                collectionAddress: "KT1Apf8CPkYBe3bRuTCET6A4NhnosX2BAnp9",
                pricePerToken: 4,
                maxMintPerUser: 5,
                saleSize: 500
              }
        
        ]
    },
    {
        eventId: 5,
        title: "Hellfest",
        startDatetime: new Date("2023-07-01T15:00:00.000Z"),
        endDatetime: new Date("2023-07-03T23:59:00.000Z"),
        address: "Clisson France",
        locationName: "Clisson",
        totalTicketsCount: 10000,
        assetUrl: "https://hellfest.com/hellfest_asset.png",
        lineUp: [
            "Metal Band",
            "Rock Band"
        ],
        ticketCollections: [ ]
    }
];

export const mockContractList = [
	{
		id: 1,
		event_id: 1,
		collection_name: "Mouse On",
		sc_address: "KT1AKqxCJH9EPimNm1wo1BEgG9bFRgptJwkk",
		collection_address: "KT1Apf8CPkYBe3bRuTCET6A4NhnosX2BAnp9",
        price_per_token: 4,
        max_mint_per_user: 5,
        sale_size: 500,
        start_time: 1656626400,
	}
]

export const mockUpdatedEvent: Event = {
    eventId: 1,
    title: "test",
    startDatetime: new Date("2022-07-10T18:30:00.000Z"),
    endDatetime: new Date("2022-07-11T01:00:00.000Z"),
    address: "1 Rue Alexandre Avisse 45000 Orléans",
    locationName: "L'Astrolabe",
    totalTicketsCount: 500,
    assetUrl: "test",
    lineUp: [
       "test"
    ],
    ticketCollections: [ 
        {
            collectionName: "test",
            scAddress: "KT1AKqxCJH9EPimNm1wo1BEgG9bFRgptJwkk",
            collectionAddress: "KT1Apf8CPkYBe3bRuTCET6A4NhnosX2BAnp9",
            pricePerToken: 4,
            maxMintPerUser: 5,
            saleSize: 500
          }
    
    ]
}