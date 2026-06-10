# Web Scraper for Dead by Daylight

A standalone **web scraping** service used by the **Builds for Dead by Daylight** project.

## Overview

This scraper is responsible for **collecting and updating** game-related data directly from the **Dead by Daylight Wiki**. The application runs independently and acts as a backend utility for the **Builds for Dead by Daylight** ecosystem.

When a **request** from backend is send, a **data refresh** initialises and service performs **automatic web scraping** operations, processes the retrieved information, and generates updated data used throughout the main application.

## Features

- **Automatic data collection and processing** from the **Dead by Daylight Wiki**
- **On-demand scraping** triggered from the **Builds for Dead by Daylight** website
- **JSON data generation** for use by the main application
- **Independent** service architecture
- **TypeScript-based implementation**

This repository is a supporting component of the Builds for Dead by Daylight project and is not intended to be used as a standalone end-user application.

Its primary purpose is to ensure that the main application always has access to up-to-date game data sourced directly from the community-maintained wiki.

## Disclaimer

This project is not affiliated with, endorsed by, or sponsored by Behaviour Interactive. Dead by Daylight and all related assets are trademarks of their respective owners.

Data is collected from publicly available sources and is used for informational purposes only.
