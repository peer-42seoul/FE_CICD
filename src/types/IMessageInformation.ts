//임의로 설정, api 생성되면 바꿀 예정

export interface IMsg {
  msgId: number
  content: string
  date: string
  isEnd: boolean
}
export interface IMessageInformation {
  senderId: number
  targetProfile: string
  senderNickname: string
  Msg: IMsg[]
}

export interface IMessagObject {
  targetId: number
  conversationalId: number
  targetNickname: string
  targetProfile: string
  unreadMsgNumber: number // 아직 확인하지 않은 메시지 데이터 수
  latestContent: string
  latestDate: string // 최신 메시지 날짜
  latestMsgId: number // 최신 메시지 고유 키
}
