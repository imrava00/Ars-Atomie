/* Ars Atomie published content. Re upload this file to GitHub to update the live site. */
window.ARS_SEED = {
  "sims": [
    {
      "id": 1793590970037,
      "title": "Untitled simulation",
      "desc": "",
      "durationMin": 0,
      "questions": [
        {
          "id": 1793591461676,
          "text": "Sebanyak $20 \\text{ g}$ asam sulfat ($\\ce{H2SO4}$) bereaksi dengan $10 \\text{ g}$ asam iodida ($\\ce{HI}$) sesuai dengan persamaan berikut:\n$$\\ce{H2SO4(aq) + HI(aq)->H2S(g) + I2(s) + H2O(l)}$$\nTentukan massa $\\ce{I2(s)}$ yang diproduksi dari reaksi tersebut!",
          "image": null,
          "options": [
            {
              "text": "$\\ce{9.91 g}$",
              "image": null
            },
            {
              "text": "$\\ce{19.82 g}$",
              "image": null
            },
            {
              "text": "$\\ce{25.92 g}$",
              "image": null
            },
            {
              "text": "$\\ce{51.84 g}$",
              "image": null
            },
            {
              "text": "$\\ce{0.039 g}$",
              "image": null
            }
          ],
          "correctIndex": 0,
          "explanation": "Persamaan Reaksi & Data Awal\n$$\\ce{H2SO4(aq) + HI(aq) -> H2S(g) + I2(s) + H2O(l)}$$\n\n$\\text{Massa } \\ce{H2SO4} = 20\\ \\text{g}$\n$\\text{Massa } \\ce{HI} = 10\\ \\text{g}$\n$Ar\\ \\ce{H} = 1,\\ Ar\\ \\ce{S} = 32,\\ Ar\\ \\ce{O} = 16,\\ Ar\\ \\ce{I} = 127$\n\nPersamaan pada soal belum setara (jumlah atom pada ruas kiri dan kanan belum sama). Tinjau bahwa reaksi ini adalah reaksi redox karena adanya perubahan bilangan oksidasi (biloks). Untuk menyetarakan reaksi redoks tersebut, kita perlu menulis reaksi ion bersihnya terlebih dahulu.\n\n$$\\ce{SO4^2- + I^- -> S^2- + I2}$$\n\nTinjau bahwa ion sulfat ($\\ce{SO4^2-}$) mengalami reaksi reduksi (diindikasikan oleh kehilangan oksigen) dan ion $\\ce{I^-}$ mengalami oksidasi menjadi $\\ce{I2}$, maka reaksi reduksi dan oksidasi yang sudah disetarakan adalah:\n\n-> Reaksi Reduksi : $\\ce{SO4^2- + 8H^+ + 8e^- -> S^2- + 4H2O}$\n-> Reaksi Oksidasi : $\\ce{2I^- -> I2 + 2e^-}$\n\nMenggabungkan reaksi reduksi dan oksidasi sehingga persamaan setaranya adalah:\n$$\\ce{H2SO4(aq) + 8HI(aq) -> H2S(g) + 4I2(s) + 4H2O(l)}$$\n\nMassa Molar ($M_r$) dari reaktan-reaktan pada reaksi redox tersebut adalah:\n-> $M_r\\ \\ce{H2SO4} = (2 \\times 1) + 32 + (4 \\times 16) = 98\\ \\text{g/mol}$\n-> $M_r\\ \\ce{HI} = 1 + 127 = 128\\ \\text{g/mol}$\n-> $M_r\\ \\ce{I2} = 2 \\times 127 = 254\\ \\text{g/mol}$\n\nLangkah 3: Menghitung Mol Awal Reaktan\n\n$$\\text{Mol } \\ce{H2SO4} = \\frac{\\text{massa}}{M_r} = \\frac{20\\ \\text{g}}{98\\ \\text{g/mol}} = 0.2041\\ \\text{mol}$$\n\n$$\\text{Mol } \\ce{HI} = \\frac{\\text{massa}}{M_r} = \\frac{10\\ \\text{g}}{128\\ \\text{g/mol}} = 0.0781\\ \\text{mol}$$\n\nLangkah 4: Menentukan Pereaksi Pembatas (*Limiting Reactant*)\n\nBagi mol awal dengan koefisien reaksinya masing-masing:\n\n-> Untuk $\\ce{H2SO4}$: $\\dfrac{0.2041}{1} = 0.2041$\n\n-> Untuk $\\ce{HI}$: $\\dfrac{0.0781}{8} = 0.00976$\n\nKarena $0.00976 < 0.2041$, maka $\\ce{HI}$ adalah pereaksi pembatas yang habis bereaksi terlebih dahulu. Semua perhitungan produk didasarkan pada jumlah $\\ce{HI}$.\n\nLangkah 5: Menghitung Mol dan Massa $\\ce{I2}$ yang Dihasilkan\n\nGunakan perbandingan koefisien reaksi setara:\n\n$$\\text{Koefisien } \\ce{I2} : \\text{Koefisien } \\ce{HI} = 4 : 8 = 1 : 2$$\n\n$$\\text{Mol } \\ce{I2} = \\frac{4}{8} \\times \\text{mol } \\ce{HI} = \\frac{1}{2} \\times 0.0781\\ \\text{mol} = 0.03906\\ \\text{mol}$$\n\nKonversi mol ke massa:\n\n$$\\text{Massa } \\ce{I2} = \\text{mol } \\ce{I2} \\times M_r\\ \\ce{I2}$$\n$$\\text{Massa } \\ce{I2} = 0.03906\\ \\text{mol} \\times 254\\ \\text{g/mol} = \\mathbf{9.92\\ \\text{g}}$$",
          "points": 2
        }
      ]
    }
  ],
  "lectures": [],
  "driveUrl": ""
};
