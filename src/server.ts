import app from './app'
import mongoose from 'mongoose'
import config from './app/config'

async function main() {
  try {
    //mongoDB connect
    // console.log(config.port,config.database_url)
    await mongoose.connect(config.database_url as string)

    //server listening
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

main()
