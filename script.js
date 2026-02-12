let currentSVG = null;
const svgContainer = document.getElementById("svg-container");
const overlayTitle = document.getElementById('overlay-title');
const overlayContent = document.getElementById('overlay-content');
const slider = document.getElementById('visibility-slider');
const currentValueSpan = document.getElementById('current-value');
const totalElements = 11; // f0 to f10 is 11 elements
const frameNotesDiv = document.getElementById('frame-notes');
const frameNotes = {
    0: "At the end of each cycle, most passerines will do a complete molt. The sequence of a complete molt is predictable and shown here.<br><br> The molt in which most to all feathers are replaced at the end of a cycle is called a <b>prebasic molt (PB)</b>.<p>Some passerines will also molt all feathers in the preformative molt (PF), such as swallows and blackbirds.</p><p>The Bobolink has a complete prealternate molt (PA).</p>",
    1: "The bird will replace p1 first. As each primary molts, the corresponding primary covert also molts. The primaries molt outward.",
    2: "The bird replaces p2 second with its corresponding primary covert. At around this time, the bird will start replacing tertials. s8 is the first to molt.",
    3: "The bird replaces p3 third. The tertials molt in both directions. The bird also replaces s7 and s9 after s8 has molted.<br><br>The American Goldfinch is molting 3 primaries (p3 is hidden), but has not started to molt the tertials.<br><br><img src='pb.png' width='350px'><br>All activities pictured were done under US Federal Banding Permits.",
    4: "The bird replaces p4 fourth. Note that the flight feathers are numbered in the order that they molt (with the exception of the tertials).",
    5: "The bird replaces p5. At around this time, the secondaries start molting. s1 is the first to molt.",
    6: "The bird replaces p6. The bird also molts s2 at around this time. The secondaries molt inward.",
    7: "The bird continues to molt primaries outwards and secondaries inwards. p7 and s3 are replaced in this diagram.",
    8: "The bird continues to molt primaries outwards and secondaries inwards. p8 and s4 are replaced in this diagram.",
    9: "The bird is nearing completion of its complete molt. Note that some passerines have 9 primaries, other have 10. s6 is the last to be replaced on the wing.<p>Because of this sequence, banders are able to see <i>molt clines</i> on the wing of bird that have done complete molts. There is a gradient of freshness depending on the molt sequence, and a slight contrast in quality between p1 and s1.</p><br><br>The Yellow Warbler is replacing p8, p9 and some inner secondaries. Because it has no remaining feathers from the last cycle, we cannot tell if the bird was a first or definitive cycle bird. We age this bird <b>Minimum Second Prebasic (M-SPB)</b>.<br><br><img src='mspb.png' width='350px'><br>All activities pictured were done under US Federal Banding Permits.",
    10: "The last primary and s6 are replaced. <p>If the species has a complete prebasic molt, and if there is no retained juvenile feather visible, the bird should be aged DCB or M-SCB (AHY).</p><p>If the species has a complete preformative (PF) and a complete prebasic molt (PB), and if there is no retained juvenile feather visible, the bird should be aged M-FCF (U in the Fall, AHY in the Spring).</p><p>If the species has a complete prealternate molt, and if there is no retained juvenile feather visible, the bird should be aged M-FCA (AHY) in the Spring.</p>"
};

const popupData = {
    'baby': {
        title: 'Hatch Day (L)',
        text: 'There are no feathers save for a few natal down feathers on the bird. <br><br><img src="baby.png" width="350px"><br>All activities pictured were done under US Federal Banding Permits.'
    },
    'fpjarrow': {
        title: 'First Prejuvenile Molt - FPJ (HY)',
        text: 'Because it is within its best interest to escape the nest (due to potential predation, competition, parasitism and disease), the bird grows in all of its feathers at once. <br><br>This simultaneous growth results in low quality feathers.<br><br><img src="fpj.png" width="350px"><br>All activities pictured were done under US Federal Banding Permits.'
    },
    'fcj': {
        title: 'First Cycle Juvenile - FCJ (HY)',
        text: 'The bird has finished its prejuvenile molt (also known as the first prebasic molt). <br><br>It has juvenile feathers are low quality and look fluffy. <br>The feathers are sparse on the body, which makes the bird seem like it has a brood patch.'
    },
    'fpfarrow': {
        title: 'First Preformative Molt - FPF (HY)',
        text: 'Because of their low quality, the bird replaces juvenile feathers (typically not all of them). <br><br>The timing of molt differs between species and individuals. Please consult the Pyle guide for molt timing. <br><br>The extent of the preformative molt (PF) differs between species and individuals. <br><br><button onclick="openExtent()">Explore extent of molt</button><p>The Vesper Sparrow below is replacing greater coverts as a part of its preformative molt.<br><br><img src="fpf.png" width="350px"><br>All activities pictured were done under US Federal Banding Permits.</p>'
    },
    'fcf': {
        title: 'First Cycle Formative - FCF (HY)',
        text: 'The bird has finished its preformative molt (PF). The resulting plumage is called the <b>formative plumage</b>.<br><br>It may retain some low quality juvenal feathers grown in the nest, creating <i>molt limits</i>.<br><br>Molt limits vary between species and individuals. <br><br><button onclick="openExtent()">Explore extent of molt</button><p>If the preformative molt (PF) is complete, first-cycle (HY) birds will look like definitive-cycle (AHY) birds. You may not be able to tell between these two ages if there are no juvenile characteristics on the bird. You should age these birds <b>Minimum First Cycle Formative (M-FCF)</b>.<br><br>This Grasshopper Sparrow went through a complete preformative molt. However, because the skull was not completely ossified, we were able to age it as an FCF (HY) bird.<br><br><img src="mfcf.png" width="350px"><br>All activities pictured were done under US Federal Banding Permits.</p>'
    },
    'fcfmigrate': {
        title: 'First Cycle Formative - FCF (HY) in Fall Migration',
        text: 'The bird is migrating to its wintering grounds. <br><br>Some species may migrate before, during or after their preformative molt.<br><br><img src="coye.png"> Warblers molt <b>before</b> they migrate<br><img src="dufl.png"> Empidonax flycatchers molt <b>after</b> they migrate. <br><img src="lazb.png"> Some buntings molt during migration.'
    },
    'fcfmigratefall': {
        title: 'First Cycle Formative - FCF (HY) in Fall Migration',
        text: 'The bird is migrating to its wintering grounds. <br><br>Some species may migrate before, during or after their preformative molt (PF). <br><br>Residential birds do not migrate.'
    },
    'fcfwinter': {
        title: 'First Cycle Formative - FCF (HY → SY) in Winter',
        text: 'The bird is now in its wintering grounds. <br><br>On January 1st, this hatch year bird (HY) turn into a second year (SY) bird. <br><br>Despite this change in aging terms, nothing biologically significant is happening with the bird.'
    },
    'fpaarrow': {
        title: 'First Prealternate Molt - FPA (SY) in Spring',
        text: 'The bird is molting some feathers for the breeding season. <br><br>Both males and females can perform this molt, but alternate feathers can be less obvious on females. <br><br>Most passerines will not replace all feathers in this molt. The extent of the prealternate molt (PA) differs between species, ages and individuals.<br><br><button onclick="openExtent()">Explore extent of molt</button>'
    },
    'fca': {
        title: 'First Cycle Alternate - FCA (SY)',
        text: 'The bird has finished its prealternate molt (PA). The resulting plumage is called the <b>alternate plumage</b>. <br><br>If PA is absent to limited in this species, and you are not sure if the bird has any alternate feathers, the WRP code is first cycle unknown (FCU).<br><br><button onclick="openExtent()">Explore extent of molt</button><br><br>In the picture below, you can see 3 generations in feathers of the Indigo Bunting. The alternate feathers are bright blue on the median coverts and greater coverts. The outer primaries are formative feathers from the PF. The brown primary coverts and inner primaries are juvenile. Find more species specific molt information in the Pyle guide.<br><br><img src="fca.png" width="350px"><br>All activities pictured were done under US Federal Banding Permits.'
    },
    'fcfmigratespring': {
        title: 'First Cycle Formative - FCF (SY) in Spring Migration',
        text: 'The bird is migrating to its breeding grounds, where it will attempt to breed. <br><br>Residential birds will not migrate. <br><br>The feathers are worn, having gone through 2 migrations.'
    },
    'fcamigrate': {
        title: 'First Cycle Alternate - FCA (SY) in Spring Migration',
        text: 'The bird is migrating to its breeding grounds, where it will attempt to breed. Residential birds will not migrate. <br><br>At this point, the retained juvenile and formative feathers are worn having gone through 2 migrations.'
    },
    'fcamate': {
        title: 'First Cycle Alternate - FCA (SY) Mating',
        text: 'The bird will attempt to find a mate. <br><br>At this point, it may develop breeding characteristics, such as a cloacal protuberance (CP) or a brood patch (BP).<br><br>A CP is a male characteristic, and both females and males may develop a BP depending on species. However, an absence of BP or CP does not indicate any sex.'
    },
    'fcfmate': {
        title: 'First Cycle Formative - FCF (SY) Mating',
        text: 'The bird will attempt to find a mate. <br><br>At this point, it may develop breeding characteristics, such as a cloacal protuberance (CP) or a brood patch (BP).<br><br>A CP is a male characteristic, and both females and males may develop a BP depending on species. However, an absence of BP or CP does not indicate any sex.'
    },
    'fcanest': {
        title: 'First Cycle Alternate - FCA (SY) on Breeding Grounds',
        text: 'The bird will attempt to build a nest, incubate eggs and raise nestlings. In some species, only females will raise young. <br><br>In some species, both will cooperatively raise young. <br><br>Some species engage in brood parasitism and do not develop BPs.'
    },
    'fcfbreed': {
        title: 'First Cycle Formative - FCF (SY) Breeding',
        text: 'The bird will attempt to build a nest, incubate eggs and raise nestlings.<br><br><img src="baor.png"> In some species, only females will raise young. <br><br><img src="howr.png"> In some species, both will cooperatively raise young. <br><br><img src="bhco.png"> Some species engage in brood parasitism and do not develop BPs.'
    },
    'spbarrow': {
        title: 'Second Prebasic Molt - SPB (SY → AHY)',
        text: 'After breeding and before migration, the bird will molt. <br>Most songbirds will replace all feathers in this molt. <br><br>Technically, when this molt completes, the cycle code will be <u>Second Cycle Basic (SCB)</u>. However, the first-cycle (SY) birds look like definitive-cycle (ASY) birds, and you will not be able to differentiate them through plumage.<br><br> Therefore, we cannot call them SCB (SY) with confidence. <br>We call these birds After Hatch Year (AHY), and we use <u>D (definitive)</u> as the first letter in the cycle to indicate a cycle higher than the first.<br><br>Feathers are replaced sequentially as opposed to simultaneously in the prejuvenile molt. This results in good quality feathers.<br><br><button onclick="openPB()">Explore molt sequence</button><br><br>In the picture below, a Common Grackle is just starting its prebasic molt, entering its second cycle. Its retained juvenile feathers are not replaced yet and look faded. <br><br><img src="spb.png" width="350px"><br>All activities pictured were done under US Federal Banding Permits.'
    },
    'dcb': {
      title:'Definitive Cycle Basic - DCB (AHY)',
      text:'When the prebasic molt finishes, first-cycle (SY) and definitive-cycle (ASY) birds look the same, so the code changes to After Hatch Year (AHY). <br><br>The bird is now in the <b>definitive basic plumage</b>. <br><br>The feather quality is nice because feathers grew in sequentially.<br><br>Note that some species such as <i>Empidonax</i> flycatchers do not complete this molt until they reach the wintering grounds, so you will be able to call them first-cycle or definitive-cycle birds well into the Fall.'
    },
    'dcbmigratefall': {
      title:'Definitive Cycle Basic - DCB (AHY) in Fall Migration',
      text:'The bird is migrating to its wintering grounds. <br><br>Some species may migrate before, during or after their prebasic molt. <br><br>Residential birds do not migrate.'
    },
    'dcbwinter': {
      title:'Definitive Cycle Basic - DCB (AHY → ASY) in Winter',
      text:'The bird is now in its wintering grounds. <br><br>On January 1st, this After Hatch Year (AHY) turn into an After Second Year (ASY) bird. <br><br>Despite this change in aging terms, nothing biologically significant is happening with the bird.'
    },
    'dpaarrow': {
      title:'Definitive Prealternate Molt - DPA (ASY)',
      text:'The bird is molting some feathers for the breeding season. <br><br>Both males and females can perform this molt, but alternate feathers can be less obvious on females. <br><br>Most passerines will not replace all feathers in this molt. The extent of the prealternate molt (PA) differs between species, ages and individuals.<br><br><button onclick="openExtent()">Explore extent of molt</button>'
    },
    'dca': {
      title:'Definitive Cycle Alternate - DCA (ASY)',
      text:'The bird has finished its prealternate molt (PA) and is now in the <b>alternate plumage</b>. <br>Alternate molt limits differ between species, ages and individuals.<br><br>If PA is absent to limited in this species, and you are not sure if the bird has any alternate feathers, the WRP code is <u>Definitive Cycle Unknown (DCU)</u>.<br><br><button onclick="openExtent()">Explore extent of molt</button><br><br>The Indigo Bunting below does not have any molt limits in the primaries, so we know it is a definitive-cycle bird. It looks like it has replaced all median coverts in the prealternate molt (PA), and possibly an inner tertial.<br><br><img src="dca.png" width="350px"><br>All activities pictured were done under US Federal Banding Permits.'
    },
    'dcamigrate': {
      title:'Definitive Cycle Alternate - DCA (ASY) in Spring Migration',
      text:'The bird will migrate to its breeding grounds.'
    },
    'dcbmigratespring': {
      title:'Definitive Cycle Basic - DCB (ASY) in Spring Migration',
      text:'The bird will migrate to its breeding grounds.'
    },
    'dcamate': {
      title:'Definitive Cycle Alternate - DCA (ASY) on Breeding Grounds',
      text:'The bird will attempt to mate. It may have more success than first-cycle birds.<br>Breeding characteristics may develop.'
    },
    'dcbmate': {
      title:'Definitive Cycle Basic - DCB (ASY) on Breeding Grounds',
      text:'The bird will attempt to mate. It may have more success than first-cycle birds.<br>Breeding characteristics may develop.'
    },
    'dcanest': {
      title:'Definitive Cycle Alternate - DCA (ASY) raising young',
      text:'The bird will attempt to brood and raise nestlings.'
    },
    'dcbbreed': {
      title:'Definitive Cycle Basic - DCB (ASY) raising young',
      text:'The bird will attempt to brood and raise nestlings.'
    },
    'dpbarrow': {
      title:'Definitive Prebasic Molt - DPB (ASY → AHY)',
      text:'After breeding, the bird will undergo a prebasic molt. <br>Most species replace all their feathers in this molt. <br><br>Molt timing varies between species and individuals.<br><br>Birds replace their feathers sequentially in this molt, resulting in nice quality fresh feathers<br><br>This is the time when first-cycle birds also replace all feathers sequentially, and look similar to definitive-cycle birds. Near the tail end of the prebasic molt, you cannot reliably call birds After Second Year. You should call these birds After Hatch Year birds.<br><br><button onclick="openPB()">Explore molt sequence</button><br><br>In the picture below, a Common Grackle is just starting its prebasic molt, entering the next cycle. There are no retained juvenile feathers on the underwing, so we know it is at least 2 years old. <br><br><img src="dpb.png" width="350px"><br>All activities pictured were done under US Federal Banding Permits.'
    },
  'pp': {
        title: 'Primary feathers / Primaries (pp)',
        text: 'There are 9-10 primary feathers depending on family. In a typical incomplete or prebasic molt, these feathers replace outwards in the order in which they are numbered (p1 is molted first).<br><br>Primaries are used for forward thrust and steering.'
    },
    'ss': {
        title: 'Secondary feathers / Secondaries (ss)',
        text: 'There are 9 secondary feathers on songbirds. When replaced in a complete or a typical incomplete molt, s1 is molted first. <br><br>Secondaries are for generating lift and stability.<br><br>The 3 innermost secondaries are called the tertials.'
    },
    'tert': {
        title: 'Tertial feathers / Tertials (terts)',
        text: 'The 3 innermost secondaries are called the tertials. These feathers may be replaced in a partial molt, and are usually replaced before the secondaries.<br><br>The tertials protect the rest of the flight feathers from wear. The tertials may also provide color for breeding plumage.<br><br>'
    },
    'mcovs': {
        title: 'Median Coverts (med covs)',
        text: 'The median coverts are directly above the greater coverts.<br><br>The median coverts cover the feather shafts of the greater coverts.<br><br>They can be classified as body plumage.'
    },
    'lcov': {
        title: 'Lesser Coverts (les covs)',
        text: 'The lesser coverts are located above the median coverts<br><br>They overlap the feather shafts of the median coverts to reduce drag and streamline airflow.<br><br>They can be classified as body plumage.'
    },
    'gcov': {
        title: 'Greater Coverts (gr covs)',
        text: 'The greater coverts are located above the secondaries<br><br>They cover the shafts of the secondary feathers.<br><br>They can be classified as body plumage.'
    },
    'rec': {
        title: 'Rectrices (recs)',
        text: 'There are 6 rectrices on a songbird (singular: rectrix). <br><br>They help stabilize, steer, brake flight.<br><br>Rectrices are often replaced simultaneously in a molt.'
    },
    'pcov': {
        title: 'Primary Coverts (p covs)',
        text: 'The primary coverts are located above the primaries. <br><br>They cover the shaft of the primary feathers. For each primary, there is a corresponding primary covert.<br><br>In a complete molt, when a bird molts a primary, the corresponding primary covert also molts with it.<br><br>An exception is when the bird is doing an eccentric incomplete molt. In this molt, the primary covert may not molt with its corresponding primary.'
    },
    'alula': {
        title: 'Alula',
        text: 'The alula is the thumb of the bird and consists of 3 feathers. <br><br>The alula is used for slowing flight, landing and taking off.<br><br>A1 is called the alula covert. A3 is the greater alula.<br><br>You may find molt limits here for birds that do a partial molt. However, A3 typically receives more wear than the other 2 alula feathers because of its location.'
    },
    'carpal': {
        title: 'Carpal Covert',
        text: 'The carpal covert is the one feather located between the primary coverts and greater coverts. <br><br>The carpal covert covers the shafts between the two tracts.'
    },
};

function loadSVG(file) {
  fetch(file)
    .then(r => r.text())
    .then(svgText => {
      svgContainer.innerHTML = svgText;
      currentSVG = svgContainer.querySelector("svg");
      currentSVG.style.width = "600px";
      currentSVG.style.height = "auto"; // preserve aspect ratio
      currentSVG.style.maxWidth = "100%"; // responsive safety
    })
    .catch(err => console.error(err));
}

function openFeathers() {
  loadSVG("feather.svg");
  document.getElementById("switcher").style.display = "none";
  document.getElementById("cycle-notes").style.display = "block";
  overlayTitle.textContent = 'Wing Feather Tracts';
  overlayContent.textContent = 'Hover to discover the feather tracts on the wing!';
  document.getElementById("pb-notes").style.display = "none";
  document.getElementById("extent-btns").style.display = "none";
  document.getElementById("extent-notes").style.display = "none";
  document.getElementById("cycle-show").style.display = "none";
  document.getElementById("tracts-show").style.display = "block";
}

function openPB() {
  loadSVG("tractspb.svg");
  document.getElementById("switcher").style.display = "none";
  document.getElementById("cycle-notes").style.display = "none";
  document.getElementById("pb-notes").style.display = "block";
  document.getElementById("extent-btns").style.display = "none";
  document.getElementById("extent-notes").style.display = "none";
  document.getElementById("cycle-show").style.display = "none";
  document.getElementById("tracts-show").style.display = "block";
}

function openExtent() {
  loadSVG("extents.svg");
  
  document.getElementById("switcher").style.display = "none";
  document.getElementById("cycle-notes").style.display = "none";
  document.getElementById("pb-notes").style.display = "none";
  document.getElementById("extent-btns").style.display = "block";
  document.getElementById("extent-notes").style.display = "block";
  document.getElementById("cycle-show").style.display = "none";
  document.getElementById("tracts-show").style.display = "block";
}

function openLimited() {
  document.getElementById("limited").style.display = "inline";
    document.getElementById("limited-notes").style.display = "block";
  document.getElementById("partial").style.display = "none";
    document.getElementById("partial-notes").style.display = "none";
  document.getElementById("eccentric").style.display = "none";
      document.getElementById("incomplete-notes").style.display = "none";
  document.getElementById("typical").style.display = "none";
  document.getElementById("complete").style.display = "none";
    document.getElementById("complete-notes").style.display = "none";
}

function openPartial() {
  document.getElementById("limited").style.display = "none";
    document.getElementById("limited-notes").style.display = "none";
  document.getElementById("partial").style.display = "inline";
    document.getElementById("partial-notes").style.display = "block";
  document.getElementById("eccentric").style.display = "none";
      document.getElementById("incomplete-notes").style.display = "none";
  document.getElementById("typical").style.display = "none";
  document.getElementById("complete").style.display = "none";
    document.getElementById("complete-notes").style.display = "none";
}

function openEccentric() {
  document.getElementById("limited").style.display = "none";
    document.getElementById("limited-notes").style.display = "none";
  document.getElementById("partial").style.display = "none";
    document.getElementById("partial-notes").style.display = "none";
  document.getElementById("eccentric").style.display = "inline";
      document.getElementById("incomplete-notes").style.display = "block";
  document.getElementById("typical").style.display = "none";
  document.getElementById("complete").style.display = "none";
    document.getElementById("complete-notes").style.display = "none";
    document.getElementById("eccentricBtn").style.display = "none";
      document.getElementById("typicalBtn").style.display = "block";
}

function openTypical() {
  document.getElementById("typical").style.display = "inline";
  document.getElementById("eccentric").style.display = "none";
  document.getElementById("typicalBtn").style.display = "none";
  document.getElementById("eccentricBtn").style.display = "block";
}

function openComplete() {
  document.getElementById("limited").style.display = "none";
    document.getElementById("limited-notes").style.display = "none";
  document.getElementById("partial").style.display = "none";
    document.getElementById("partial-notes").style.display = "none";
  document.getElementById("eccentric").style.display = "none";
      document.getElementById("incomplete-notes").style.display = "none";
  document.getElementById("typical").style.display = "none";
  document.getElementById("complete").style.display = "inline";
    document.getElementById("complete-notes").style.display = "block";
}

svgContainer.addEventListener('click', function (e) {
    let currentElement = e.target;
    while (currentElement && currentElement !== svgContainer) {
        const id = currentElement.id;
        if (popupData[id]) {
            const data = popupData[id];
            overlayTitle.textContent = data.title;
            overlayContent.innerHTML = data.text;
            return;
        }
        currentElement = currentElement.parentElement;
    }
});
loadSVG("cbs.svg");
document.getElementById("svg-switch").addEventListener("change", function () {
  const file = this.checked ? "cas.svg" : "cbs.svg";
  loadSVG(file);
  document.querySelectorAll('.toggle-control').forEach(cb => cb.checked = true);
});

document.getElementById('show-container').addEventListener('change', function(e) {
  if (e.target.classList.contains('toggle-control')) {
    const target = document.getElementById(e.target.dataset.target);
    if (target) {
      target.style.display = e.target.checked ? 'inline' : 'none';
    }
  }
});

function updateSVGVisibility() {
    const sliderValue = parseInt(slider.value, 10);
    currentValueSpan.textContent = sliderValue;
    frameNotesDiv.innerHTML = frameNotes[sliderValue] || "Note: Caption not found for this stage.";
    // ---------------------------------

    for (let i = 0; i < totalElements; i++) {
        const elementId = `f${i}`;
        const element = document.getElementById(elementId);

        if (element) {
            // If the element's index (i) is less than or equal to the slider's value, show it.
            if (i == sliderValue) {
                element.classList.remove('hidden-element');
                element.classList.add('visible-element');
            } else {
                element.classList.add('hidden-element');
                element.classList.remove('visible-element');
            }
        }
    }
}

updateSVGVisibility();
slider.addEventListener('input', updateSVGVisibility);
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contactModal');
    window.openContact = function() {
        modal.classList.add('active');
    };
    function closeContact() {
        modal.classList.remove('active');
    }
    modal.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeContact();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeContact();
        }
    });
});
