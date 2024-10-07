export type ImageFormat = {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
  };
  
  export type Image = {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail: ImageFormat;
        small: ImageFormat;
        large: ImageFormat;
        medium: ImageFormat;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any | null;
      createdAt: string;
      updatedAt: string;
    };
  };
  
  export type Video = {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number | null;
      height: number | null;
      formats: any | null;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any | null;
      createdAt: string;
      updatedAt: string;
    };
  };
  
  export type StartSectionData = {
    id: number;
    attributes: {
      title: string;
      sub_title: string | null;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      background: {
          data:Image
      };
      logo:{
        data:Image
      },
      video: Response<Video>;
    };
  };
  export type AboutSectionData = {
      id:number;
      attributes: {
          title:string;
          sub_title:string | null;
          content:string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
          images:{
              data:Image[]
          }
      }
  }
  export type RouteSectionData = {
    id:number;
    attributes: {
        name:string;
        description:string | null;
        summary:string;
        price:number;
        duration:number;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        boatsCount?: number;
        departures:Response<RouteDepartureData[]>;
        images:{
            data:Image[]
        }
    }
  }
  export type RouteDepartureData = {
    id:number; 
    attributes:{
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      time:string;
    }
  }

  export type ContactInfoData = {
    id:number; 
    attributes:{
      address: string;
      title: string;
      summary: string;
      content:any[];
      phone_number:string;
    }

  }
  export type ServicesInfoData = TService[]
  export type TService = {
    id:number; 
    attributes:{
      name: string;
      image: {
        data:Image
      }
    }
  }
  export type FeedbacksInfoData = TFeedback[]
  export type TFeedback = {
    id:number; 
    attributes:{
      name: string;
      text: string;
      image: {
        data:Image
      };
      avatar: {
        data:Image
      }
    }
  }

  export type Response<T> = {
    data: T;
    meta: any;
  };

  export interface IOrder {
    id: number;
    attributes: {
      count: number;
      in_procces: boolean;
      comment: string;
      createdAt: string; // ISO 8601 date string
      updatedAt: string; // ISO 8601 date string
      date: string; // ISO 8601 date string
      client: Client;
      route: Route;
      departure: Departure;
    };
  }
  
  
  interface Client {
    data: {
      id: number;
      attributes: {
        name: string;
        createdAt: string; // ISO 8601 date string
        updatedAt: string; // ISO 8601 date string
        phone: string;
      };
    };
  }
  
  interface Route {
    data: {
      id: number;
      attributes: {
        name: string;
        description: string;
        summary: string;
        price: number;
        duration: number;
        createdAt: string; // ISO 8601 date string
        updatedAt: string; // ISO 8601 date string
        publishedAt: string; // ISO 8601 date string
      };
    };
  }
  
  interface Departure {
    data: {
      id: number;
      attributes: {
        time: string; // time string in format HH:mm:ss.SSS
        createdAt: string; // ISO 8601 date string
        updatedAt: string; // ISO 8601 date string
        publishedAt: string; // ISO 8601 date string
      };
    };
  }
  