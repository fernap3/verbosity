//@import "MainMenu.ts"

class Game
{
	private page: HTMLElement;
	private mainMenu: MainMenu;
	private engine: Engine;
	private playArea: HTMLElement;
	
	constructor (page: HTMLElement)
	{
		this.page = page;
		
		this.engine = new Engine({
			Page: document.getElementById("PlayArea"),
			OnWinCallback: () => { console.log("WIN"); },
			OnLoseCallback: () => { console.log("LOSE"); },
			OnQuitCallback: () => { this.HidePlayArea(); this.mainMenu.Show(); }
		});
		
		this.playArea = document.getElementById("PlayArea");
		
		Centerer.SetupResizeHandler();
	}
	
	Begin ()
	{
		this.mainMenu = new MainMenu({
			MenuContainer: document.getElementById("MainMenu"),
			OnJustPlayCallback: () => { this.StartJustPlay(); }
		});
		
		this.mainMenu.Show();
	}
	
	// Choose a random puzzle from the list to play
	private StartJustPlay ()
	{
		this.mainMenu.Hide();
		this.ShowPlayArea();
		
		this.engine.SetPuzzle(Puzzles["Game Boy"]);
		this.engine.StartGame();
	}
	
	private ShowPlayArea ()
	{
		this.playArea.style.display = "block";		
	}
	
	private HidePlayArea ()
	{
		this.playArea.style.display = "none";		
	}
}

new Game(document.body).Begin();
