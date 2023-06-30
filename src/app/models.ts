
export interface IJobAd {
    id: string;
    title: string;
    description: string;
    skills: string[];
    status: JobAdStatus;
}

export type JobAdStatus = 'draft' | 'published' | 'archived';

export type PaginationLinks = {
    first: string,
    last: string,
    next: string,
    prev: string;
};