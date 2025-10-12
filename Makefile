dev:
	@echo "Starting Dev Environment"
	docker compose -f backend/docker-compose.yml up --build -d
	cd backend && pnpm run start:dev