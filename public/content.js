function extractPairings() {
  function calculateResult(left, right) {
    if (left === '_') {
      return 'pending';
    }
    if (Number(left) > Number(right)) {
      return `Won ${left}-${right}`;
    }
    if (Number(left) < Number(right)) {
      return `Lost ${left}-${right}`;
    }
    return `Draw ${left}-${right}`;
  }

  function generateCSV() {
    const searchInput = document.querySelector('.pairings__search input');
    const inProgress = document.querySelector(
      '#el-component__inprogress-checkbox',
    );

    if (searchInput && searchInput.value) {
      alert('Please clear the search input before generating the CSV.');
      return '';
    }
    if (inProgress && inProgress.checked) {
      alert(
        'Please uncheck the "In Progress" checkbox before generating the CSV.',
      );
      return '';
    }

    const data = [...document.querySelectorAll('.pairings-table tbody tr')]
      .filter(
        (el) =>
          !el.querySelector(
            '.pairings-table__cell .bye, .pairings-table__cell .late-registered',
          ),
      )
      .map((el) => {
        const scoreCells = el.querySelectorAll(
          '.pairings-table__cell--result .box-score',
        );
        const leftScore = scoreCells[0] ? scoreCells[0].textContent ?? '' : '';
        const rightScore = scoreCells[1] ? scoreCells[1].textContent ?? '' : '';
        return {
          // Table:
          //   '"' +
          //   el.querySelector('.pairings-table__cell--table-num')?.textContent +
          //   '"',
          // Player:
          //   '"' +
          //   el.querySelector('.pairings-table__cell--left .team__display-name')
          //     .textContent +
          //   '"',
          // Result: '"' + calculateResult(leftScore, rightScore) + '"',
          // Opponent:
          //   '"' +
          //   el.querySelector('.pairings-table__cell--right .team__display-name')
          //     .textContent +
          //   '"',
          Table: `"${
            el.querySelector('.pairings-table__cell--table-num')?.textContent ??
            ''
          }"`,
          Player: `"${
            el.querySelector('.pairings-table__cell--left .team__display-name')
              ?.textContent ?? ''
          }"`,
          Result: `"${calculateResult(leftScore, rightScore)}"`,
          Opponent: `"${
            el.querySelector('.pairings-table__cell--right .team__display-name')
              ?.textContent ?? ''
          }"`,
        };
      });

    const csv =
      '"Table","Player","Result","Opponent"\n' +
      data
        .map((d) => [d.Table, d.Player, d.Result, d.Opponent].join(','))
        .join('\n');
    console.log('CSV generated:');
    console.log(csv);
    return csv;
  }

  const csv = generateCSV();
  if (csv) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(csv).then(
        () => {
          alert('Pairings copiati nella clipboard!');
        },
        (err) => {
          console.error('Failed to copy:', err);
          alert('Errore nel copiare i dati.');
        },
      );
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = csv;
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        alert('Pairings copiati nella clipboard!');
      } catch (err) {
        console.error('Failed to copy (old):', err);
        alert('Errore nel copiare i dati.');
      }
      document.body.removeChild(textarea);
    }
  }
}
extractPairings();
