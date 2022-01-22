package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func testHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"test": "successful"})
}

// name generator
type nameGeneratorRequest struct {
	Keywords    []string `json:"keywords" binding:"required"`
	Description string   `json:"description" binding:"required"`
}

func nameGeneratorHandler(c *gin.Context) {
	var body nameGeneratorRequest
	err := c.ShouldBindJSON(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		fmt.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"name": "foobar"})
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
		fmt.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"idea": "this is an idea"})
}
