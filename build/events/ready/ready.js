import Event from "../../Structures/Event.js";
export default new Event({
    event: "ready",
    run: async (client) => {
        client.logger.info("Logged in with " + client.user.tag);
    },
});
