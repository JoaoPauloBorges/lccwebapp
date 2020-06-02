export enum ResearcherTypes {
  Researcher = 'Researcher',
  Coordinator = 'Coordinator',
  Partner = 'Partner'
}

export interface Researcher {
  _id: string;
  type: ResearcherTypes;
  name: string;
  abbreviation: string;
  headline: string;
  phoneNumber: string;
  about: string;
  socialNetworks: [string];
  email: string;
  lattesUrl: string;
  imagePath: string;
}
