// Package middleware contains HTTP middleware functions
package middleware

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
)

// CorsMiddleware adds CORS headers to allow cross-origin requests
func CorsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, Authorization")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")

		// Handle preflight requests
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

// LoggingMiddleware logs request information
func LoggingMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Start timer
		startTime := time.Now()

		// Process request
		c.Next()

		// Calculate latency
		latency := time.Since(startTime)

		// Log request details
		statusCode := c.Writer.Status()
		clientIP := c.ClientIP()
		method := c.Request.Method
		path := c.Request.URL.Path

		fmt.Printf("[GIN] %s | %d | %s | %s | %s | %s\n",
			time.Now().Format("2006/01/02 - 15:04:05"),
			statusCode,
			latency.String(),
			clientIP,
			method,
			path)
	}
}
