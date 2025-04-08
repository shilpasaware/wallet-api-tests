const fs = require('fs');
const path = require('path');

/**
 * Gets configuration data from config file
 * @returns {Object} The configuration object
 */
function getConfig() {
  const env = process.env.TEST_ENV || 'test';
  const configPath = path.resolve(__dirname, '../config', `${env}.json`);
  
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.error(`Error loading config file from ${configPath}:`, error);
    // Return a default config to prevent crashes
    return {
      api: {
        baseUrl: "https://challenge.test.local/challenge/api/v1",
        serviceId: "wallet-api-tests"
      },
      user: {
        username: "testuser",
        password: "testpassword"
      }
    };
  }
}

/**
 * Loads test data from the specified JSON file
 * @param {string} dataSetName - Name of the data set to load
 * @param {string} filename - Optional filename
 * @returns {Object} The test data object
 */
function loadTestData(dataSetName, filename) {
  try {
    // Determine which data file to use based on the data set name
    if (!filename) {
      if (dataSetName.includes('user')) {
        filename = 'authentication-test-data.json';
      } else {
        filename = 'transaction-test-data.json';
      }
    }
    
    const dataPath = path.resolve(__dirname, '../test-data', filename);
    
    // Check if file exists
    if (!fs.existsSync(dataPath)) {
      console.error(`Test data file not found: ${dataPath}`);
      return {}; // Return empty object to prevent crashes
    }
    
    const testData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    if (!testData[dataSetName]) {
      console.warn(`Data set "${dataSetName}" not found in ${filename}`);
      return {}; // Return empty object to prevent crashes
    }
    
    return testData[dataSetName];
  } catch (error) {
    console.error(`Error loading test data:`, error);
    return {}; // Return empty object to prevent crashes
  }
}

/**
 * Processes a string to replace variables with values from the data object
 * @param {string} text - The text containing variables to replace
 * @param {Object} data - The data object containing values for variables
 * @returns {string} Text with variables replaced by their values
 */
function processTemplate(text, data) {
  if (!text || typeof text !== 'string') return text;
  
  // Replace ${data.propertyName} with the corresponding value
  return text.replace(/\${data\.([^}]+)}/g, (match, propertyPath) => {
    // Handle nested properties
    const value = propertyPath.split('.').reduce((obj, key) => 
      obj && typeof obj === 'object' ? obj[key] : undefined, data);
    return value !== undefined ? value : match; // Keep original if not found
  });
}

/**
 * Processes a data table by replacing variables with their values
 * @param {Object} dataTable - Cucumber data table
 * @param {Object} data - Data object with values for variables
 * @returns {Array} Processed data table rows
 */
function processDataTable(dataTable, data) {
  if (!dataTable || !dataTable.hashes) return [];
  
  return dataTable.hashes().map(row => {
    const newRow = {};
    Object.keys(row).forEach(key => {
      const processedKey = processTemplate(key, data);
      const processedValue = processTemplate(row[key], data);
      newRow[processedKey] = processedValue;
    });
    return newRow;
  });
}

/**
 * Waits for a specified amount of time
 * @param {number} ms - Time to wait in milliseconds
 * @returns {Promise} Promise that resolves after the specified time
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Formats a date as an ISO string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date = new Date()) {
  return date.toISOString();
}

// Export all helper functions
module.exports = {
  getConfig,
  loadTestData,
  processTemplate,
  processDataTable,
  wait,
  formatDate
};