import {createApp, App} from 'vue'
import Message, {API} from "./Message.vue";
import { MessageOption, MessageType } from "./message-types";

export default {
  install: function(app: App) {
    const container = document.createElement("div");
    container.id = "MessageContainer";
    document.body.appendChild(container);
    // eslint-disable-next-line
    const instance = createApp(Message) as Message
    instance.mount(container) // TODO


    const types: MessageType[] = ["primary" , "warning" , "danger" , "info" , "success"];
    type ShorthandMessageFunction = (message: string, duration: number) => void

    const options = types.reduce((acc, type) => {
      acc[type] = (message, duration) => {
        API.addMessage({ type, message, duration });
      }
      return acc
    }, {} as {[key in MessageType]: ShorthandMessageFunction})

    app.config.globalProperties.$message = {
      open: function({ type, message, duration }: MessageOption) {
        API.addMessage({type, message, duration});
      },
      ...options
    };
  },
};
