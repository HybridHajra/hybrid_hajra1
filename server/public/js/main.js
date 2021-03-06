$(() => {
    const socket = io();

    let state = {
        gameComplete: false,
        message: null,
        gameBoard: [], 
        nextTurn: null,
        winnerPattern: null
    };

    $('td').on('click', event => {
        socket.emit('click td', event.target.id);
    });

    socket.on('gameboard update', updatedGameData => {
        if(updatedGameData.isUpdated) {
            updateStateAndRenderDom(updatedGameData);
        }
    });


    const updateStateAndRenderDom = updatedGameData => {
        updateState(updatedGameData);
        renderUpdatedStateOnDom();
    };

    const updateState = gameData => {
        state = gameData;
    }

    const renderUpdatedStateOnDom = () => {
        renderMessage();
        renderGameBoardOnDom();
    }

    const renderMessage = () => {
        $('.current-player-turn').text(state.nextTurn);
        if(state.gameComplete) {
            $('.player-turn-display').hide();
            $('.message').text(state.message);
        }
    }

    const renderGameBoardOnDom = () => {
        state.gameBoard.map((figure, index) => {
            $('#' + index).text(figure);
        });
    }
});