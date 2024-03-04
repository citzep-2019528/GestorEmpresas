import { initServer } from "./config/app.js"
import { connect } from "./config/mongodb.js"

initServer()
connect()