export type Event = {
  id?: number;
  name: string;
  description: string;
  date: Date;
  status: boolean;
  ownerId: number;
};

export type EditableEvent = {
  id?: number;
  name?: string;
  description?: string;
  date?: Date;
  status?: boolean;
}