export interface travel {
    dateTime: string;
    email: string;
    travelDate: string;
    locationFrom: string;
    locationTo: string;
    gco: string;
    travelType: string;
}

export const afgelopenRitten: travel[] = [
    { 
        dateTime:'2022-01-01T10:00:00', 
        email:'baasiebaaas@hoefen.nl', 
        travelDate:'2022-01-01', 
        locationFrom: 'Amsterdam', 
        locationTo: 'Rotterdam', 
        gco: 'GCO1' , 
        travelType:'Trein'
    },
    { 
        dateTime:'2022-02-01T12:00:00', 
        email:'meneerPaul@123.nl', 
        travelDate:'2022-02-01', 
        locationFrom: 'Rotterdam', 
        locationTo: 'Utrecht', 
        gco: 'GCO2' , 
        travelType:'Bus'
    },
    { 
        dateTime:'2022-03-01T14:00:00', 
        email:'rubenkloever@hotmail', 
        travelDate:'2022-03-01', 
        locationFrom: 'Utrecht', 
        locationTo: 'Amsterdam', 
        gco: 'GCO3' , 
        travelType:'auto'
    },
];