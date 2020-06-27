# csv-processor

> Project to handle large csv-files and import the data to mongodb
> **Important!** project requires docker and yarn.


## Development setup

```batch
# install dependencies
$ yarn install

# run mongo and mongo-express
$ docker-compose up

# start server
$ yarn start
```
## Verify mongodb
![alt text](https://gist.githubusercontent.com/mejiaej/8f5181e4ccb5d8dbd3020d7113f088cc/raw/a667b111cd4383bd967cf1f43391c82b45a24f79/mongo.PNG?raw=true)

## Send large csv file located in /test/csv/
> **Important!** copy /test/csv/test-large.csv to postman working directory, otherwise postman won't send the file.
![alt text](https://gist.githubusercontent.com/mejiaej/8f5181e4ccb5d8dbd3020d7113f088cc/raw/a667b111cd4383bd967cf1f43391c82b45a24f79/postman-csv.PNG?raw=true)

## See the data in http://localhost:8081/db/dealership/cars
> **Important!** it may take some seconds to fully import the data due to the large amount (700,000)
![alt text](https://gist.githubusercontent.com/mejiaej/8f5181e4ccb5d8dbd3020d7113f088cc/raw/a667b111cd4383bd967cf1f43391c82b45a24f79/mongo-populated.PNG?raw=true)
