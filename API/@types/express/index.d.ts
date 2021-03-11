import { IDUser } from "../../src/models/IDUser"
import { PublicUser } from "../../src/routes/user/types";

declare global {
    namespace Express {
        interface Request {
            User: IDUser,
            UserToGet?: PublicUser
        }
    }
}