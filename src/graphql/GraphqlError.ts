export interface GraphQLError {
	errors: Array<{
		errorType: string
		message: string
	}>
}
