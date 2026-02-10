# AGENTS.md

## Build Commands
- `npm run dev` - Start development server with tsx watch
- No test framework configured yet
- No linting configured yet

## Code Style Guidelines

### TypeScript Configuration
- ES2020 target with nodenext module resolution
- Strict mode enabled
- Path aliases: `@config/*`, `@game/*`, `@interfaces/*`

### Import Conventions
- Use path aliases for internal imports
- External imports first, then internal imports
- Group imports by type (external, internal, relative)

### Naming Conventions
- Classes: PascalCase (Game, Board, Piece)
- Interfaces: Prefix with 'I' (IGame, IBoard)
- Methods/variables: camelCase
- Constants: UPPER_SNAKE_CASE

### Architecture Patterns
- Interface-first design with separate interface files
- Abstract base classes for shared functionality
- Domain-driven structure (game/, interfaces/, config/)

### Error Handling
- Throw descriptive errors for unimplemented methods
- Use TypeScript strict mode for type safety