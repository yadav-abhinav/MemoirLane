export interface IMedia {
  id: string;
  src: string;
  fileName: string;
  size: number;
  height: number;
  width: number;
  format: string;
  favourite: boolean;
  caption?: string;
  uploadedAt?: Date;
}
