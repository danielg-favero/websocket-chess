import { HTTPMethod, type IHTTPClient } from "@infra/http/types";

import type {
  IGetPlayersService,
  GetPlayersPayload,
  GetPlayersResponse,
} from "./get-players-service.types";

export class GetPlayersService implements IGetPlayersService {
  constructor(private httpClient: IHTTPClient) {}

  async execute(payload: GetPlayersPayload): Promise<GetPlayersResponse> {
    const { gameRoomId } = payload;

    const response = await this.httpClient.sendRequest<GetPlayersResponse>({
      endpoint: `/game/${gameRoomId}/players`,
      method: HTTPMethod.GET,
    });

    return response.data;
  }
}
