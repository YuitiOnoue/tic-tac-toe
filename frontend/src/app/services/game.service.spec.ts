import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { GameService } from './game.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Game } from '../models/game.model';

describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;
  const mockGame: Game = {
    id: '123',
    currentPlayer: 'X',
    board: Array(9).fill(null),
    status: 'active',
    winner: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should createGame send a POST and return the game', () => {
    service.createGame().subscribe((game) => {
      expect(game).toEqual(mockGame);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/v1/games');
    expect(req.request.method).toBe('POST');
    req.flush(mockGame);
  });

  it('should getGame send a GET and return the game', () => {
    service.getGame(mockGame.id).subscribe((game) => {
      expect(game).toEqual(mockGame);
    });

    const req = httpMock.expectOne(
      'http://localhost:3000/api/v1/games/' + mockGame.id,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockGame);
  });

  it('should makeMove send a POST and return the game', () => {
    service.makeMove(mockGame.id, 3).subscribe((game) => {
      expect(game).toEqual(mockGame);
    });

    const req = httpMock.expectOne(
      'http://localhost:3000/api/v1/games/' + mockGame.id + '/move',
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ position: 3 });
    req.flush(mockGame);
  });
});
