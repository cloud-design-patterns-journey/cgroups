// Package config contains application configuration
package config

import (
	"os"
	"strconv"
)

// Config holds application configuration
type Config struct {
	Port int
	Env  string
}

// NewConfig creates a new configuration with default values
// and overrides them with environment variables if available
func NewConfig() *Config {
	config := &Config{
		Port: 8080,
		Env:  "development",
	}

	if port := os.Getenv("PORT"); port != "" {
		if p, err := strconv.Atoi(port); err == nil {
			config.Port = p
		}
	}

	if env := os.Getenv("ENV"); env != "" {
		config.Env = env
	}

	return config
}
