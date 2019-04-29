import { getManager } from "typeorm";
import Director from "../models/Director";

export default abstract class IRepository {

    protected getDirectorRepository() {
        return getManager().getRepository(Director);
    }

}
