package main

import (
	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.POST("/test", testHandler)

	r.POST("/nameGenerator", nameGeneratorHandler)
	r.POST("/ideaGenerator", ideaGeneratorHandler)
	r.POST("/reminder", reminderHandler)
	r.POST("/analyzeCode", codeAnalyzerHandler)
	r.POST("/fixBugs", fixBugsHandler)
	r.POST("/ffa", ffaHandler)
	r.POST("/chatbot", chatbotHandler)
	r.POST("/replySMS", replySMSHandler)

	return r
}
