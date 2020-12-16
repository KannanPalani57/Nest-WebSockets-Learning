import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WsResponse
 } from '@nestjs/websockets';
 import { Logger } from "@nestjs/common"
import {Socket, Server} from "socket.io"

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  private logger: Logger = new Logger("AppGateWay")

  afterInit(server: Server){
    this.logger.log("Intialized")
  }

  handleDisconnect(client: Socket, ...args: any[]){
    this.logger.log("client connected", client.id)
  }

  handleConnection(client: Socket){
    this.logger.log("client disconnected", client.id)
  }

  
  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, text: string): WsResponse<String> {
    return { event: "msgToClient", data: text}
  }
}
