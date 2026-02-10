type IRetriveReturns<TData> = [TData, null] | [null, unknown];

export async function retrive<TData>(
  callback: (...args: unknown[]) => Promise<TData>,
): Promise<IRetriveReturns<TData>> {
  try {
    const data = await callback();
    return [data, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}
