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
      video: Video;
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

  export type Response<T> = {
    data: T;
    meta: any;
  };