export interface TicketCollection {
  collectionName: string;
  scAddress: string;
  collectionAddress: string;
  pricePerToken: number;
  maxMintPerUser: number;
  saleSize: number;
}

export interface Event {
    eventId: number;
    title: string;
    startDatetime: Date;
    endDatetime: Date;
    address: string;
    locationName: string;
    totalTicketsCount: number;
    assetUrl: string;
    lineUp: string[];
    ticketCollections: TicketCollection[]
}

export interface UpdatableFields {
  eventTitle?: string;
  lineUp?: string[];
  assetUrl?: string;
  collectionName?: string;
}