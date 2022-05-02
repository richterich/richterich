import { create } from "browser-sync";
/**
 * Create instance of dev server
 */
const browserSync = create('dev-sync');

export default browserSync;