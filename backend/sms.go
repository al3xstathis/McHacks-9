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

func getAuth() (string, string, string, error) {
	SID := os.Getenv("TWILIO_SID")
	if SID == "" {
		return "", "", "", errors.New("TWILIO_SID not found")
	}

	auth := os.Getenv("TWILIO_AUTH_TOKEN")
	if auth == "" {
		return "", "", "", errors.New("TWILIO_AUTH_TOKEN not found")
	}

	from := os.Getenv("FROM_NUMBER")
	if auth == "" {
		return "", "", "", errors.New("FROM_NUMBER not found")
	}

	return SID, auth, from, nil
}

func sendSMS(body string, number string) {
	SID, auth, from, err := getAuth()
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
	params.SetFrom(from)
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
	timeAfter := (t.Sub(currentTime)) - 30*time.Minute

	time.AfterFunc(timeAfter, func() { sendSMS(body, number) })

	return nil
}
