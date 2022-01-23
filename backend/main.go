package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var APIKeys = [3]string{}

func main() {
	port := getEnvVariables()

	r := setupRouter()
	r.Run(":" + port)
}

func getEnvVariables() string {
	err := godotenv.Load("./.env")
	if err != nil {
		log.Fatal("Could not find/load .env file", err)
	}

	k1 := os.Getenv("API_KEY_1")
	if k1 == "" {
		log.Fatal("Could not find API_KEY_1")
	}

	k2 := os.Getenv("API_KEY_2")
	if k2 == "" {
		log.Fatal("Could not find API_KEY_2")
	}

	k3 := os.Getenv("API_KEY_3")
	if k3 == "" {
		log.Fatal("Could not find API_KEY_3")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	APIKeys[0] = k1
	APIKeys[1] = k2
	APIKeys[2] = k3

	return port
}
