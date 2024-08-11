export interface EventByIdAPIResponse {
  success: boolean;
  data: EventByIdInterface;
}

export interface EventByIdInterface {
  id: string;
  name: string;
  dates: Date[];
  votes: Vote[];
}

export interface Vote {
  date: Date;
  people: string[];
}

export interface EventResultByIdAPIResponse {
  id: string;
  name: string;
  suitableDates: SuitableDate[];
}

export interface SuitableDate {
  date: string;
  people: string[];
}
