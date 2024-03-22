# CryptoScamDefender

A cybersecurity toolkit for disrupting fraudulent crypto investment platforms.

## Overview

CryptoScamDefender is a suite of tools developed for cybersecurity researchers and professionals to analyze and disrupt operations on websites involved in cryptocurrency investment scams. It aims to provide ethical hackers and law enforcement agencies with resources to understand and mitigate the tactics employed by cybercriminals.

## Disclaimer

This toolkit is intended for educational, research, and legal use cases only. Users must ensure that all activities conducted with CryptoScamDefender comply with local, national, and international laws. The creators of CryptoScamDefender are not responsible for any misuse or illegal use of this toolkit.

## Features

1. Automated account creation scripts to analyze scam operations.
2. Modules for simulating realistic interactions to disrupt scams.
3. Documentation on common patterns in cryptocurrency scams.

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/gekkedev/CryptoScamDefender.git
```

2. Install dependencies:
```bash
yarn ci
```

## Usage

This script allows you to make a specified number of requests to a given API with randomized data, including random delays between requests to simulate more human-like interactions.

To run the script, you need to specify three parameters: the total number of requests to make, the minimum delay between requests (in milliseconds), and the maximum delay between requests (in milliseconds).
```bash
node index.js <totalRequests> <minDelay> <maxDelay>
```
### Example
To make 100 requests with random delays ranging from 0.1 second (100ms) to 15 seconds (15000ms), run the following command:
```bash
node index.js 100 150 15000
```

## Contributing

Contributions are welcome, especially from cybersecurity experts, ethical hackers, and law enforcement personnel.

## License

This project is licensed under the MIT License - see the LICENSE file for details.