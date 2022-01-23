package main

import (
	"context"
	"encoding/xml"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	gogpt "github.com/sashabaranov/go-gpt3"
)

func getAPIKey() string {
	rand.Seed(time.Now().UnixNano())
	return APIKeys[rand.Intn(len(APIKeys))]
}

func openAIRequest(maxTokens int, prompt string, temperature float32, stopSeqs []string, frequencePenalty float32, presencePenalty float32) (string, error) {
	c := gogpt.NewClient(getAPIKey())

	req := gogpt.CompletionRequest{
		MaxTokens:        maxTokens,
		Prompt:           prompt,
		Temperature:      temperature,
		Stop:             stopSeqs,
		FrequencyPenalty: frequencePenalty,
		PresencePenalty:  presencePenalty,
	}

	resp, err := c.CreateCompletion(context.Background(), "davinci", req)
	if err != nil {
		log.Println(err)
		return "", err
	}

	return resp.Choices[0].Text, nil
}

// test route
type testRequest struct {
	Description string `json:"description"`
}

func testHandler(c *gin.Context) {
	var body testRequest
	err := c.ShouldBindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"name": "test works"})
}

// name generator
type nameGeneratorRequest struct {
	Description string `json:"description" binding:"required"`
}

func nameGeneratorHandler(c *gin.Context) {
	var body nameGeneratorRequest
	err := c.ShouldBindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}

	if len(body.Description) > 150 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request too long or short, only 3 keywords please"})
		log.Println("request too long or short")
		return
	}

	prompt := fmt.Sprintf(nameGenerationString, body.Description)
	res, err := openAIRequest(32, prompt, 0.8, []string{"4.", "\n\n"}, 0.5, 0)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"openAI error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"name": res})
}

// idea generator
type ideaGeneratorRequest struct {
	Keywords []string `json:"keywords" binding:"required"`
}

func ideaGeneratorHandler(c *gin.Context) {
	var body ideaGeneratorRequest
	err := c.ShouldBindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}

	if len(body.Keywords) != 3 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request too long or short, only 3 keywords please"})
		log.Println("request too long or short")
		return
	}

	keywords := body.Keywords[0] + ", " + body.Keywords[1] + " and " + body.Keywords[2]
	prompt := fmt.Sprintf(ideaGenerationString, keywords)
	res, err := openAIRequest(250, prompt, 0.7, []string{"4."}, 1.0, 1.0)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"openAI error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"ideas": "1." + res})
}

// text reminder
type reminderRequest struct {
	Time   string `json:"time" binding:"required"`
	Number string `json:"number" binding:"required"`
}

func reminderHandler(c *gin.Context) {
	var body reminderRequest
	err := c.ShouldBindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}

	err = sendSMSTime(body.Time, reminderString, "+1"+body.Number)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success"})
}

// replying SMS
type smsReplyRequest struct {
	XMLName xml.Name `xml:"Response"`
	Message string   `xml:"Message"`
}

func replySMSHandler(c *gin.Context) {
	var body smsReplyRequest
	err := c.ShouldBindXML(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}
	if body.Message == "yes" || body.Message == "Yes" {
		sendSMSTimeFormatted(10*time.Minute, "Here's your second reminder that your deadline is approaching!")
	}
	c.JSON(http.StatusOK, gin.H{"status": "success"})
}

// code analyzer
type codeAnalyzerRequest struct {
	Code     string `json:"code" binding:"required"`
	Language string `json:"language" binding:"required"`
}

func codeAnalyzerHandler(c *gin.Context) {
	var body codeAnalyzerRequest
	err := c.ShouldBindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}

	if len(body.Language) > 5 || len(body.Code) > 3000 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request too long, please keep below 2500 characters"})
		log.Println("request too long")
		return
	}

	prompt := fmt.Sprintf(codeAnalyzerString, body.Code, body.Language)
	res, err := openAIRequest(250, prompt, 0.0, []string{}, 0.0, 0.0)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"openAI error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"description": res})
}

// bug fixer
type fixBugsRequest struct {
	Code     string `json:"code" binding:"required"`
	Language string `json:"language" binding:"required"`
}

func fixBugsHandler(c *gin.Context) {
	var body fixBugsRequest
	err := c.ShouldBindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}

	if len(body.Language) > 5 || len(body.Code) > 3000 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request too long, please keep below 2500 characters"})
		log.Println("request too long")
		return
	}

	prompt := fmt.Sprintf(fixBugsString, body.Language, body.Code, body.Language)
	res, err := openAIRequest(250, prompt, 0.0, []string{}, 0.0, 0.0)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"openAI error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"fixed": res})
}

// free for all anything sent it passed onto openAI API
type ffaRequest struct {
	Prompt string `json:"prompt" binding:"required"`
}

func ffaHandler(c *gin.Context) {
	var body ffaRequest
	err := c.ShouldBindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}

	if len(body.Prompt) > 1500 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request too long, please keep below 2500 characters"})
		log.Println("request too long")
		return
	}

	res, err := openAIRequest(200, body.Prompt, 0.5, []string{}, 0.0, 0.0)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"openAI error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"response": res})
}

// chatbot handler
type chatbotRequest struct {
	Chat string `json:"chat" binding:"required"`
}

func chatbotHandler(c *gin.Context) {
	var body chatbotRequest
	err := c.ShouldBindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}

	if len(body.Chat) > 1500 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request too long, please keep below 2500 characters"})
		log.Println("request too long")
		return
	}

	prompt := fmt.Sprintf(chatbotString, body.Chat)
	res, err := openAIRequest(200, prompt, 0.9, []string{"\n", "Human:", "AI:"}, 0.0, 0.6)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"openAI error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"response": res})
}
