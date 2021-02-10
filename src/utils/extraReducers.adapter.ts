export type ExtraReducersConfig = [any, any][];

/**
 * Adapting the multidimensional array to the extraReducers
 * The cause of the array usage is AsyncThunk cannot be used as an object key
 * @param extraReducers
 */
export default (extraReducers: ExtraReducersConfig) => (builder: any) => {
  extraReducers.forEach((reducerConfig) => {
    builder.addCase(reducerConfig[0], reducerConfig[1]);
  });
};
