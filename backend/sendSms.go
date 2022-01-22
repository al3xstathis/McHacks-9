package main

import (
	"fmt"
	"time"

	twilio "github.com/twilio/twilio-go"
	openapi "github.com/twilio/twilio-go/rest/api/v2010"
)

func sendSMS(body string, number string) {
	accountSid := "ACb21e5a7a74003191fb2e00072dc7655b"
	authToken := "5ee8581a21f0200d97036db9f5c923de"

	client := twilio.NewRestClientWithParams(twilio.RestClientParams{
		Username: accountSid,
		Password: authToken,
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
