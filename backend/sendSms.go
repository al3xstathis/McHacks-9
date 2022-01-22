package main

import (
	"errors"
	"fmt"
	"log"
	"os"
	"time"

	twilio "github.com/twilio/twilio-go"
	openapi "github.com/twilio/twilio-go/rest/api/v2010"
)

func getAuth() (string, string, error) {
	SID := os.Getenv("TWILIO_SID")
	if SID == "" {
		return "", "", errors.New("TWILIO_SID not found")
	}

	auth := os.Getenv("TWILIO_AUTH_TOKEN")
	if auth == "" {
		return "", "", errors.New("TWILIO_AUTH_TOKEN not found")
	}

	return SID, auth, nil
}

func sendSMS(body string, number string) {
	SID, auth, err := getAuth()
	if err != nil {
		log.Println(err)
		return
	}

	client := twilio.NewRestClientWithParams(twilio.RestClientParams{
		Username: SID,
		Password: auth,
	})

	params := &openapi.CreateMessageParams{}
	params.SetTo(number)
	params.SetFrom("+14386006469")
	params.SetBody(body)

	resp, err := client.ApiV2010.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		err = nil
	} else {
		fmt.Println("Message Sid: " + *resp.Sid)
	}
}

func sendSMSTime(timeString string, body string, number string) error {
	layout := time.RFC3339
	t, err := time.Parse(layout, timeString)
	if err != nil {
		return err
	}
	currentTime := time.Now()
	timeAfter := t.Sub(currentTime)
	time.AfterFunc(timeAfter, func() { sendSMS(body, number) })
	return nil
}

func main() {
	sendSMSTime("2022-01-22T19:59:00.243Z", "sup beauty", "+15147174318")
	for {
	}
}
