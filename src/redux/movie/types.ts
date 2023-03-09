export enum Status {
	NONE = 'none',
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

export interface ISearchResponse {
	Response: string,
	Search?: IMovie[],
	totalResults?: string,
	Error?: string,
}

export interface IMovie {
	Poster: string,
	Title: string,
	Type: string,
	Year: string,
	imdbID: string
}

export interface initialStateType {
	status: Status,
	movies: IMovie[],
	error: string,
	totalResults: number
	searchValue: string,
}