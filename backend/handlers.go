package main

import (
	"context"
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

func openAIRequest(maxTokens int, prompt string, temperature float32, stopSeqs []string, presencePenalty float32) (string, error) {
	c := gogpt.NewClient(getAPIKey())

	req := gogpt.CompletionRequest{
		MaxTokens:       maxTokens,
		Prompt:          prompt,
		Temperature:     temperature,
		Stop:            stopSeqs,
		PresencePenalty: presencePenalty,
	}

	resp, err := c.CreateCompletion(context.Background(), "ada", req)
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

	prompt := fmt.Sprintf(nameGenerationString, body.Description)
	res, err := openAIRequest(32, prompt, 0.8, []string{"4.", "\n\n"}, 2.0)
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

	keywords := body.Keywords[0] + ", " + body.Keywords[1] + " and " + body.Keywords[2]
	prompt := fmt.Sprintf(ideaGenerationString, keywords)
	res, err := openAIRequest(250, prompt, 0.7, []string{"3."}, 2.0)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"openAI error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"ideas": "1." + res})
}

// text reminder
type reminderRequest struct {
	Time string `json:"time" binding:"required"`
}

func reminderHandler(c *gin.Context) {
	var body reminderRequest
	err := c.ShouldBindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success"})
}
