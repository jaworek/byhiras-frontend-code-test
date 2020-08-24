# Byhiras - frontend code test

[![Netlify Status](https://api.netlify.com/api/v1/badges/9367f5b7-0600-47b7-97da-7c5413f32780/deploy-status)](https://app.netlify.com/sites/angry-mestorf-c28705/deploys)

### Specification:

- Two dice are rolled for the player.
- Two dice are rolled for the monster.
- All dice are 6-sided. For each roll pick a random number between 1 and 6. The results of all 4 rolls should
  be displayed.
- Whoever scores the lowest total will take damage and lose health points. The amount of health they
  lose will be the difference between the two rolls. So: if the player rolls a 2 and a 3, and the monster rolls
  a 4 and a 5, the player will take (4+5)-(3+2) = 4 damage.
- Now the player can attack again when they like.
- If the player loses all their health the game stops and “Game Over” is displayed in large red text.
- If the monster loses all their health the game ends and “You Win” is displayed in large green text.

### Ideas for improvement:

- Use local storage to keep game state
- Add option to toggle sound effects
- Add dark mode support
- Add tests
- Make website more responsive to different screen types
- Add history of attacks with statistics on how much damage has been dealt (done)
- Add option to select number of dice
- Optimize unnecessary renders
- Add animation to player images
- Change image based on attack result
- Add option to specify player names
- Make app work offline