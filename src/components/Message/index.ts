import {createApp, App} from 'vue'
import Message, {API} from "./Message.vue";
import { MessageOption, MessageType } from "./message-types";

const container = document.createElement("div");
container.id = "MessageContainer";
document.body.appendChild(container);
// eslint-disable-next-line
const instance = createApp(Message)
instance.mount(container)

const types: MessageType[] = ["primary" , "warning" , "danger" , "info" , "success"];
type ShorthandMessageFunction = (message: string, duration?: number) => void

const shortHandMessages = types.reduce((acc, type) => {
  acc[type] = (message, duration) => {
    API.addMessage({ type, message, duration });
  }
  return acc
}, {} as {[key in MessageType]: ShorthandMessageFunction})

export const message = {
  open: function({ type, message, duration }: MessageOption) {
    API.addMessage({type, message, duration});
  },
  ...shortHandMessages
}

export default {
  install: function(app: App) {
    app.config.globalProperties.$message = message;
  },
};
