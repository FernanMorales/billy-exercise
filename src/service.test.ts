import {EventService } from './service';

import { mockDeep } from 'jest-mock-extended';
import { Client } from 'pg';
import { mockClientResult, mockClientUpdateResult, mockContractList, mockEvents, mockUpdatedContract, mockUpdatedEvent } from './mockData';
import mock from 'jest-mock-extended/lib/Mock';

const mockClient = mockDeep<Client>();
const service = new EventService(mockClient);

describe('Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    
    it('should return a list of events', async () => {
        mockClient.query
        .mockImplementationOnce(() => Promise.resolve({ rows: mockClientResult }))
        .mockImplementationOnce(() => Promise.resolve({ rows: mockContractList }))
        const events = await service.get();
        expect(events).toEqual(mockEvents);
    })

    it('should filter the list of event with a sale start date', async () => {
        mockClient.query
        .mockImplementationOnce(() => Promise.resolve({ rows: mockClientResult }))
        .mockImplementationOnce(() => Promise.resolve({ rows: mockContractList }))
        const event = await service.get(1656626400);
        expect(event).toEqual([mockEvents[0]]);
    })

    it('should return a event by id', async () => {
        mockClient.query
        .mockImplementationOnce(() => Promise.resolve({ rows: mockClientResult }))
        .mockImplementationOnce(() => Promise.resolve({ rows: mockContractList }))
        const event = await service.getById(1);
        expect(event).toEqual(mockEvents[0]);
    })

    it('should update an event and ticket with the given id and fields', async () => {
        mockClient.query
        .mockImplementationOnce(() => Promise.resolve({ rows: mockClientUpdateResult }))
        .mockImplementationOnce(() => Promise.resolve({ rows: mockClientUpdateResult }))
        .mockImplementationOnce(() => Promise.resolve({ rows: mockUpdatedContract }))
        const updatedEvent = await service.update(1, { eventTitle: "test", lineUp: "test"});
        expect(updatedEvent).toEqual(mockUpdatedEvent)
    })
});