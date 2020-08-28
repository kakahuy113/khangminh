import axios from "axios";
 
export interface NoticeClient {
    success: true | null | undefined,
    error: false | null | undefined
}
export const axiosClient = axios.create({
})

axiosClient.interceptors.request.use(async (config) => {
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        console.log(response);
        return response.data;
    }

    return response;
}, (error) => {
    throw error;
})


class ApiService {

  
    get(url: string, notice: NoticeClient, { ...config } = {} = {}) {
        return new Promise((resolve, reject) => {
            return axiosClient({
                url: url,
                ...config
            })
                .then(response => {
                    if (notice.success) this.process({ type: "success", text: "The proccess successfully" });

                    resolve(response.data);
                })
                .catch(({ response }) => {
                    if (notice.error) this.process({ type: "error", text: "Oop! You have few issues here" });

                    reject(response);
                });
        });
    }

    /**
     * Post request
     * @param {String} url The url using call api
     * @param {Object} data The data submit
     * @param {Boolean} notice Show modal message
     * @param {*} config The configs instance headers, etc
     */
    post(url: string, data: any, notice: NoticeClient, { ...config } = {}) {
        return new Promise((resolve, reject) => {
            return axios({
                url: url,
                data: { ...data },
                ...config
            })
                .then(response => {
                    if (notice) this.process({ type: "success", text: "The proccess successfully" });

                    resolve(response.data);
                })
                .catch(({ response }) => {
                    if (notice) this.process({ type: "error", text: "Oop! You have few issues here " });
                    reject(response);
                });
        });
    }

    /**
     * 
     * @param {String} url The url call api
     * @param {Object} data The data submit 
     * @param {Boolean} notice Show modal message 
     * @param {*} config th configs instance headers, etc
     */
    put(url: string, data: any, notice: NoticeClient, { ...config } = {}) {
        return new Promise((resolve, reject) => {
            return axios({
                url,
                data: { ...data },
                ...config
            })
                .then(response => {
                    if (notice) this.process({ type: "success", text: "The proccess successfully" });

                    resolve(response.data);
                })
                .catch(({ response }) => {
                    if (notice) this.process({ type: "error", text: "Oop! You have few issues here " });
                    reject(response);
                });
        });
    }

    /**
     * 
     * @param {String} url The url call api
     * @param {Object} data The data submit 
     * @param {Boolean} notice Show modal message 
     * @param {*} config th configs instance headers, etc
     */
    patch(url: string, data: any, notice: NoticeClient, { ...config } = {}) {
        return new Promise((resolve, reject) => {
            return axios({
                url,
                data: { ...data },
                ...config
            })
                .then(response => {
                    if (notice) this.process({ type: "success", text: "The proccess successfully" });

                    resolve(response.data);
                })
                .catch(({ response }) => {
                    if (notice) this.process({ type: "error", text: "Oop! You have few issues here " });
                    reject(response);
                });
        });
    }

    /**
     * 
     * @param {String} url The url call api
     * @param {Object} data The data submit 
     * @param {Boolean} notice Show modal message 
     * @param {*} config th configs instance headers, etc
     */
    delete(url: string, data: any, notice: NoticeClient, { ...config } = {}) {
        return new Promise((resolve, reject) => {
            return axios({
                url,
                data: { ...data },
                ...config
            })
                .then(response => {
                    if (notice) this.process({ type: "success", text: "The proccess successfully" });

                    resolve(response.data);
                })
                .catch(({ response }) => {
                    if (notice) this.process({ type: "error", text: "Oop! You have few issues here " });
                    reject(response);
                });
        });
    }

    /**
     * Process message notice
     * @param {String} type The type of message (success | warn | error | info)
     * @param {String} text The text need notice
     */
    process({ type, text }: { type: string; text: string; }) {
        switch (type) {
            case "success":
                alert(text || "Yehh, Successfully");
                break;
            case "error":
                alert(text || "~Oop! Something went is wrong !");
                break;
            default:
                alert(text);
        }
    }
}

export default new ApiService();
