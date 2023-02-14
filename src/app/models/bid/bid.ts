export interface Bid {
    "auctionType": string,
    "reservePrice": number,
    "priceUnit": string,
    "convertorUnit": string,
    "tickSize": number,
    "perQuantityUnit": string,
    "totalQuantity": number,
    "totalQuantityUnit": string,
    "minimumQty": number,
    "minIncrementalQty": number,
    "startDateTime": string,
    "endDateTime": string,
    "emdValue": number,
    "emdUnit": string,
    "warehouseName": string,
    "warehouseAddress": string,
    "termsConditions": string,
    "confirmationStatus": string,
    "confirmationRemark": string,
    "addedBy": string,
    "startPrice": number
    "aggregatorType": string,
    "bidListAddedBy": string,
    "aggregatorDataId": number,
    "rejectRemark": string,
    "aggregatorCode": string,
    "customerDataId": number,
    "bidListHasAuctionListing": [
        {
            "bidListIdBidList": number,
            "auctionListingIdAuctionListing": number
        }
    ],
        "cityMasterId": number,
        "auctionImageIds": [
          number
        ]
      
} 