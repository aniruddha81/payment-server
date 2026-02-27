import "dotenv/config";
import { app } from "./app.ts";

export const PORT = process.env.PORT || 8080;

export const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});