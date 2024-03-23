import fetch from "node-fetch"
import { faker } from "@faker-js/faker"
import { createHash } from "crypto"

// Parse command-line arguments
const args = process.argv.slice(2);
let totalRequests, minDelay, maxDelay;

try {
  if (args.length < 3 || isNaN(parseInt(args[0])) || isNaN(parseInt(args[1])) || isNaN(parseInt(args[2]))) {
    throw new Error('You must provide three numerical arguments: totalRequests, minDelay, maxDelay');
  }
  totalRequests = parseInt(args[0]);
  minDelay = parseInt(args[1]);
  maxDelay = parseInt(args[2]);
} catch (error) {
  console.error(`Error parsing arguments: ${error.message}`);
  process.exit(1);
}

const getRandomUserAgentDetails = () => {
  const userAgents = [
    {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
      secChUa: "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
      secChUaPlatform: "\"Windows\"",
    },
    {
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
      secChUa: "\" Not A;Brand\";v=\"99\", \"Safari\";v=\"605\", \"AppleWebKit\";v=\"605\"",
      secChUaPlatform: "\"macOS\"",
    },
    //TODO: Add more combinations
  ];
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const makeRequest = async () => {
  const { userAgent, secChUa, secChUaPlatform } = getRandomUserAgentDetails();

  const userData = {
    username: faker.internet.userName(),
    pass: faker.internet.password(),
    deal_pass: faker.internet.password(),
    //invite_code: faker.string.alphaNumeric(6), // Assuming invite codes are 6 alphanumeric characters
    invite_code: "bWejuP", //given by the scammer with the nickname "Alexia"
    nickname: faker.phone.number('+###########') //in the GUI, labeled as phone number
    //TODO: set the locale first and utilize it as param to *faker* where supported
  };

  //advanced "validation" in the Chinese Baidu code: a salted and hashed timestamp
  /*function o() {
    var t = Date.parse(new Date) / 1e3
      , n = t + "@62b7c5572a99ee1@" + t;
    return r.default.md5(n)
  }*/
  const currentTime = Date.parse(new Date) / 1e3
  const saltedTimeHash = createHash("md5").update(currentTime + "@62b7c5572a99ee1@" + currentTime).digest("hex")

  const languages = ["de-DE,de;q=0.9", "en-US,en;q=0.9", "fr-FR,fr;q=0.9", "es-ES,es;q=0.9"]; //TODO: add more
  const acceptLanguage = languages[Math.floor(Math.random() * languages.length)];

  const headers = {
    "accept": "*/*",
    "accept-language": acceptLanguage,
    "content-type": "application/json",
    "s-time": currentTime, //these two s-headers need to match
    "s-token": saltedTimeHash,
    "schedule-lang": "en",
    "sec-ch-ua": secChUa,
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": secChUaPlatform,
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "thinkphp_show_page_trace=0|0",
    "Referer": "https://www.adjust-work.net/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "User-Agent": userAgent
  };

  try {
    const response = await fetch("https://www.adjust-work.net//register", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    console.log('Request done:', data.msg);
  } catch (error) {
    console.error('Request failed:', error);
  }
};

const requestLoop = async (totalRequests, minDelay, maxDelay) => {
  for (let i = 0; i < totalRequests; i++) {
    await makeRequest();

    // Generate a random delay
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;

    // Wait for the delay before the next request
    await new Promise(resolve => setTimeout(resolve, delay));
  }
};

// Example usage: make 5 requests with delays between 1s (1000ms) and 5s (5000ms)
//requestLoop(5, 1000, 5000);
requestLoop(totalRequests, minDelay, maxDelay);